{
    "name": "slack-conversation",
    "intents": [
      {
        "intent": "hello",
        "examples": [
          {
            "text": "greetings"
          },
          {
            "text": "hi"
          },
          {
            "text": "howdy"
          },
          {
            "text": "Hello"
          },
          {
            "text": "good morning"
          }
        ],
        "description": "descritption"
      },
      {
        "intent": "Add",
        "examples": [
          {
            "text": "ajouter"
          },
          {
            "text": "mettre"
          },
          {
            "text": "peux tu ajouter du nuttella"
          },
          {
            "text": "Peux tu ajouter"
          }
        ],
        "description": "Add a product to braket"
      },
      {
        "intent": "plannifier",
        "examples": [
          {
            "text": "prendre un rendez vous"
          }
        ],
        "description": "Plannifier quelquechose dans mon agenda"
      },
      {
        "intent": "goodbye",
        "examples": [
          {
            "text": "bye"
          },
          {
            "text": "farewell"
          },
          {
            "text": "i'm done"
          },
          {
            "text": "see you later"
          }
        ],
        "description": ""
      }
    ],
    "entities": [
      {
        "entity": "fromage",
        "values": [
          {
            "type": "synonyms",
            "value": "fromage",
            "metadata": null,
            "synonyms": [
              "camenbert",
              "brie",
              "fromage de chevre",
              "gruyere"
            ]
          }
        ],
        "metadata": null,
        "description": null,
        "fuzzy_match": false
      },
      {
        "entity": "patteATartiner",
        "values": [
          {
            "type": "synonyms",
            "value": "nuttella",
            "metadata": null,
            "synonyms": [
              "patte a tartiner"
            ]
          }
        ],
        "metadata": null,
        "description": null
      }
    ],
    "language": "fr",
    "metadata": {
      "api_version": {
        "major_version": "v1",
        "minor_version": "2017-05-26"
      }
    },
    "description": "",
    "dialog_nodes": [
      {
        "type": "standard",
        "title": null,
        "output": {
          
        },
        "parent": "node_1_1523025255722",
        "context": null,
        "metadata": {
          
        },
        "next_step": null,
        "conditions": "@fromage",
        "description": null,
        "dialog_node": "node_1_1523457265324",
        "previous_sibling": null
      },
      {
        "type": "standard",
        "title": null,
        "output": {
          "text": {
            "values": [
              "Ok, See you later!"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": null,
        "context": null,
        "metadata": {
          
        },
        "next_step": null,
        "conditions": "#goodbye",
        "description": null,
        "dialog_node": "node_2_1520454758444",
        "previous_sibling": "node_1_1520454636196"
      },
      {
        "type": "standard",
        "title": "Hello",
        "output": {
          "text": {
            "values": [
              "Good day for you"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": null,
        "context": null,
        "metadata": {
          
        },
        "next_step": null,
        "conditions": "#hello",
        "description": null,
        "dialog_node": "node_1_1520454636196",
        "previous_sibling": "node_1_1523025255722"
      },
      {
        "type": "standard",
        "title": null,
        "output": {
          "text": {
            "values": [
              "que voulez vous ajouter"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": null,
        "context": null,
        "metadata": {
          
        },
        "next_step": {
          "behavior": "jump_to",
          "selector": "condition",
          "dialog_node": "node_1_1523457265324"
        },
        "conditions": "#Add",
        "description": null,
        "dialog_node": "node_1_1523025255722",
        "previous_sibling": "Bienvenue"
      },
      {
        "type": "standard",
        "title": "EntryPointTOaddProduct",
        "output": {
          "text": {
            "values": [
              
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": null,
        "context": null,
        "metadata": {
          
        },
        "next_step": null,
        "conditions": "#Add",
        "description": null,
        "dialog_node": "node_2_1521037424081",
        "previous_sibling": "node_2_1520454758444"
      },
      {
        "type": "standard",
        "title": "Tout le reste",
        "output": {
          "text": {
            "values": [
              "Je n'ai pas compris. Vous pouvez essayer de reformuler.",
              "Pouvez-vous dire cela autrement ? Je ne comprends pas.",
              "Je n'ai pas compris ce que vous voulez dire."
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": null,
        "context": null,
        "metadata": {
          
        },
        "next_step": null,
        "conditions": "anything_else",
        "description": null,
        "dialog_node": "Tout le reste",
        "previous_sibling": "node_3_1521039167868"
      },
      {
        "type": "standard",
        "title": "true",
        "output": {
          
        },
        "parent": null,
        "context": null,
        "metadata": {
          
        },
        "next_step": null,
        "conditions": null,
        "description": null,
        "dialog_node": "node_3_1521039167868",
        "previous_sibling": "node_2_1521037424081"
      },
      {
        "type": "standard",
        "title": "Welcome",
        "output": {
          "text": {
            "values": [
              "Welcome to the Conversation tutorial ?"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": null,
        "context": null,
        "metadata": {
          
        },
        "next_step": null,
        "conditions": "welcome",
        "description": null,
        "dialog_node": "Bienvenue",
        "previous_sibling": null
      }
    ],
    "workspace_id": "a7c18bf9-eff1-4dda-b0cb-938435d35c74",
    "counterexamples": [
      
    ],
    "learning_opt_out": false
  }