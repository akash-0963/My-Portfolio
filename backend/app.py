from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Connection
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/portfolio')
try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    db = client['portfolio']
    contacts_collection = db['contacts']
    client.admin.command('ping')
    print("✅ MongoDB connected successfully")
except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")
    print("Make sure MongoDB is running or set MONGO_URI in .env")

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Backend is running'}), 200

@app.route('/api/contacts', methods=['POST'])
def add_contact():
    """Save contact information from portfolio contact form"""
    try:
        data = request.json

        # Validate required fields
        required_fields = ['name', 'email', 'phone', 'service', 'idea']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Create contact object
        contact = {
            'name': data.get('name'),
            'email': data.get('email'),
            'countryCode': data.get('countryCode', '+91'),
            'phone': data.get('phone'),
            'service': data.get('service'),
            'budget': data.get('budget', 'N/A'),
            'idea': data.get('idea'),
            'timestamp': datetime.now()
        }

        # Save to MongoDB
        result = contacts_collection.insert_one(contact)
        contact['_id'] = str(result.inserted_id)

        return jsonify({
            'message': 'Contact saved successfully',
            'contact': contact
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    """Retrieve all contact submissions"""
    try:
        contacts = list(contacts_collection.find().sort('timestamp', -1))
        # Convert ObjectId to string for JSON serialization
        for contact in contacts:
            contact['_id'] = str(contact['_id'])
            contact['timestamp'] = contact['timestamp'].isoformat()

        return jsonify({
            'total': len(contacts),
            'contacts': contacts
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contacts/<contact_id>', methods=['GET'])
def get_contact(contact_id):
    """Retrieve a specific contact by ID"""
    try:
        contact = contacts_collection.find_one({'_id': ObjectId(contact_id)})

        if not contact:
            return jsonify({'error': 'Contact not found'}), 404

        contact['_id'] = str(contact['_id'])
        contact['timestamp'] = contact['timestamp'].isoformat()
        return jsonify(contact), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contacts/<contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    """Delete a contact submission"""
    try:
        result = contacts_collection.delete_one({'_id': ObjectId(contact_id)})

        if result.deleted_count == 0:
            return jsonify({'error': 'Contact not found'}), 404

        return jsonify({'message': 'Contact deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contacts/search', methods=['POST'])
def search_contacts():
    """Search contacts by email or name"""
    try:
        data = request.json
        query = data.get('query', '').lower()

        if not query:
            return jsonify({'error': 'Query parameter required'}), 400

        # MongoDB text search
        results = list(contacts_collection.find({
            '$or': [
                {'name': {'$regex': query, '$options': 'i'}},
                {'email': {'$regex': query, '$options': 'i'}}
            ]
        }).sort('timestamp', -1))

        for contact in results:
            contact['_id'] = str(contact['_id'])
            contact['timestamp'] = contact['timestamp'].isoformat()

        return jsonify({
            'query': query,
            'total': len(results),
            'contacts': results
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contacts/<contact_id>', methods=['PATCH'])
def update_contact(contact_id):
    """Update a contact submission"""
    try:
        data = request.json
        result = contacts_collection.update_one(
            {'_id': ObjectId(contact_id)},
            {'$set': data}
        )

        if result.matched_count == 0:
            return jsonify({'error': 'Contact not found'}), 404

        contact = contacts_collection.find_one({'_id': ObjectId(contact_id)})
        contact['_id'] = str(contact['_id'])
        contact['timestamp'] = contact['timestamp'].isoformat()

        return jsonify({
            'message': 'Contact updated successfully',
            'contact': contact
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get statistics about contacts"""
    try:
        total = contacts_collection.count_documents({})
        services = {}
        for service in ['Web Development', 'App Development', 'Other']:
            services[service] = contacts_collection.count_documents({'service': service})

        return jsonify({
            'total': total,
            'by_service': services
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
