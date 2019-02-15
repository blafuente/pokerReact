import React, {Component} from 'react';
import Deck from '../utilityClasses/Deck';
import GameButtons from './GameButtons';
import PokerHand from './PokerHand';

class PokerTable extends Component{
    constructor(){
        super();
        this.cards = new Deck();
        this.cards.createDeck();
        this.cards.shuffleDeck();
        console.log(this.cards);
        this.state = {
            playersHand: ['blue_back','blue_back'],
            dealersHand: ['blue_back','blue_back']
        }
        this.prepDeck = this.prepDeck.bind(this);
    }

    // This is a custom METHODS. Not coming from "React"
    // We can't put this in our Deck class, because it's specific to our Hold em
    prepDeck(){
        this.cards.deck.shift(); // burn card
        let dealCard = this.cards.deck.shift(); 
        const card1 = dealCard;
        const card2 = dealCard;
        const card3 = dealCard;
        const card4 = dealCard;
        // deck is now only 48, becuase we mutated this.deck when we ran shift 
        this.setState({
            playersHand: [card1, card3],
            dealersHand: [card2, card4],
        })
    }


    render(){
        return(
            <div className="col-sm-12 the-table">
                <PokerHand cards={this.state.dealersHand} />
                <PokerHand cards={this.state.playersHand} />
                <GameButtons dealFunction={this.prepDeck}/>
            </div>
        )
    }
}


export default PokerTable;