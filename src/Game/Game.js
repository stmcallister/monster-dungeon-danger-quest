import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import GameInfo from './GameInfo/GameInfo';
import createMonster from './Monsters/MonsterCreate';


class Game extends Component {
    state = {
        score: 0,
        player: {
            name: '',
            health: 100,
            attack: 10,
            defense: 10
        },
        isPlayerAlive: true,
        currentMonster: undefined,
        currentlyFighting: false
    }

    render() {
        return (
            <>
                <GameInfo score={this.state.score} player={this.state.player} />
                <ChatBot
                    width={`600px`}
                    // speechSynthesis={{ enable: true, lang: 'en' }}
                    steps={
                        [
                            {
                              id: `game-start`,
                              message: `Welcome adventurer! Thank you for coming to save us from these terrible monsters. What is your name?`,
                              trigger: `player-create`
                            },
                            {
                              id: `player-create`,
                              user: true,
                              validator: (value) => {
                                if (value.length > 20) {
                                    return 'Name too long. Keep it to 20 characters or less.';
                                } else {
                                    return true;
                                }
                            },
                              trigger: `hello-hero`
                            },
                            {
                              id: `hello-hero`,
                              message: ({ previousValue }) => {
                                this.setState({ player: { name: previousValue }});
                                return `Greetings ${previousValue}. We are so happy you have come to help us. The dungeon awaits you.`
                              },
                              trigger: `enter-dungeon`
                            },
                            {
                                id: `enter-dungeon`,
                                component: (
                                    <div> The Dungeon of Horrors </div>
                                ),
                                end: true
                            }
                          ]
                    }
                />
            </>
        )
    }

}

export default Game;