import time
import requests
import sqlite3
import json

from utils import DB_FILE, LOCAL_LANG, extract_last_number, find_flavor_text, find_local_name
FIELDS = ["evolution_chain_id", "baby_trigger_item", "chain"]

def get_chain_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        evolution_chain_id = extract_last_number(url)

        return {
          "evolution_chain_id": evolution_chain_id,
          "baby_trigger_item": data['baby_trigger_item'],
          "chain": parse_chain(data['chain'])
        }
    else:
        return None
    

def get_all_chains(conn, cursor, is_append = False):
    response = requests.get('https://pokeapi.co/api/v2/evolution-chain?offset=0&limit=100000')
    if response.status_code == 200:
        data = response.json()
        print('total:', data['count'])
        evolution_chains = data['results']
        for chains in evolution_chains:
            evolution_chain_id = extract_last_number(chains['url'])
            cursor.execute('SELECT * FROM evolution_chain WHERE evolution_chain_id = ?', (evolution_chain_id,))
            existing_chain_data = cursor.fetchone()
            if existing_chain_data is None:
                time.sleep(1)
                chain_data = get_chain_data(chains['url'])
                if chain_data:
                    insert_chain(cursor, chain_data, existing_chain_data)
                    conn.commit()

def insert_chain(cursor, data, existing_data = None):
    print('Inserting evolution_chain:', data['evolution_chain_id'])
    try:
        if existing_data:
            update_fields = []
            update_values = []
            # 获取列名
            cursor.execute('PRAGMA table_info(evolution_chain)')
            columns = [column[1] for column in cursor.fetchall()]
            
            for field in FIELDS:
                if field in columns:
                    index = columns.index(field)
                    if not existing_data[index] and data[field]:
                        update_fields.append(f"{field} = ?")
                        update_values.append(data[field])

            if update_fields:
                update_values.append(data['name'])
                update_query = f"UPDATE evolution_chain SET {', '.join(update_fields)} WHERE name = ?"
                cursor.execute(update_query, update_values)
                
        else:  
            cursor.execute('''
                INSERT INTO evolution_chain (evolution_chain_id, baby_trigger_item, chain)
                VALUES (?, ?, ?)
            ''', (
              data['evolution_chain_id'],
              data['baby_trigger_item'],
              data['chain']
            ))
    except Exception as e:
        print('Error inserting evolution_chain:', e)


def parse_chain(chain):
    if chain:
        return json.dumps(parse_evolves_to([chain]), ensure_ascii=False)
    return None

def parse_evolves_to(evolves_to):
    results = []
    for evolve in evolves_to:
        details = parse_details(evolve['evolution_details'])
        results.append({
            "details": details,
            "is_baby": evolve['is_baby'],
            "species": evolve['species']['name'],
            "pokemon": evolve['species']['name'],
            "pokemon_form": evolve['species']['name'],
            "evolves_to": parse_evolves_to(evolve['evolves_to']) if evolve['evolves_to'] else None
        })
    return results

def parse_details(details):
    results = []
    for detail in details:
        detail['trigger'] = get_name('trigger', detail)
        detail['held_item'] = get_name('held_item', detail)
        detail['known_move'] = get_name('known_move', detail)
        detail['known_move_type'] = get_name('known_move_type', detail)
        detail['location'] = get_name('location', detail)
        detail['party_species'] = get_name('party_species', detail)
        detail['party_type'] = get_name('party_type', detail)
        detail['trade_species'] = get_name('trade_species', detail)

        # detail['trigger'] = detail['trigger']['name'] if detail['trigger'] else None
        # details['held_item'] = detail['held_item']['name'] if detail['held_item'] else None
        # details['trigger'] = detail['trigger']['name'] if detail['trigger'] else None
        # details['known_move'] = detail['known_move']['name'] if detail['known_move'] else None
        # details['known_move_type'] = detail['known_move_type']['name'] if detail['known_move_type'] else None
        # details['location'] = detail['location']['name'] if detail['location'] else None
        # details['party_species'] = detail['party_species']['name'] if detail['party_species'] else None
        # details['party_type'] = detail['party_type']['name'] if detail['party_type'] else None
        # details['trade_species'] = detail['trade_species']['name'] if detail['trade_species'] else None
        results.append(detail)
    return results

def get_name(field, data):
    return data[field]['name'] if data[field] else None

def run():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS evolution_chain (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            evolution_chain_id INTEGER,
            baby_trigger_item TEXT,
            chain TEXT
        )
    ''')
    get_all_chains(conn, cursor)
    conn.close()

if __name__ == '__main__':
    print('Start fetching evolution_chain...')
    run()
