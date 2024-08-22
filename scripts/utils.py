import json
import re

LOCAL_LANG = 'zh-Hans'
DB_FILE = '././pokemon.db'

def find_local_name(names, lang = LOCAL_LANG):
    name = next((n for n in names if n['language']['name'] == lang), None)
    return name['name'] if name else None

def extract_last_number(url):
    match = re.search(r'/(\d+)/?$', url)
    if match:
        return int(match.group(1))
    return None

def find_flavor_text(flavor_texts, lang = LOCAL_LANG):
    texts = []
    for text in flavor_texts:
        if text['language']['name'] == lang:
            text= {
                "flavor_text": text['flavor_text'],
                "version_group": text['version_group']['name']
            }
            texts.append(text)
    return json.dumps(texts, ensure_ascii=False)

def find_types(types):
    result = []
    for type in types:
        result.append(type['type']['name'])
    return json.dumps(result, ensure_ascii=False)

def find_effect_entries(effect_entries, lang = LOCAL_LANG):
    texts = []
    for text in effect_entries:
        if text['language']['name'] == lang:
            text= {
                "effect": text['effect'],
                "short_effect": text['short_effect']
            }
            texts.append(text)
    return json.dumps(texts, ensure_ascii=False)

def find_pokemons(pokemons):
    return json.dumps([pokemon['pokemon']['name'] for pokemon in pokemons], ensure_ascii=False)