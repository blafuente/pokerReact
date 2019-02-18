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
            dealersHand: ['blue_back','blue_back'],
            communityCard: ['blue_back','blue_back','blue_back','blue_back','blue_back'],
            wager: 0,
            bankroll: 10000
        }
        this.prepDeck = this.prepDeck.bind(this);
        this.playerBet = this.playerBet.bind(this);
    }

    // This is a custom METHODS. Not coming from "React"
    // We can't put this in our Deck class, because it's specific to our Hold em
    prepDeck(){
        this.cards.createDeck();
        this.cards.shuffleDeck();
        this.cards.deck.shift(); // burn card
        const card1 = this.cards.deck.shift();
        const card2 = this.cards.deck.shift();
        const card3 = this.cards.deck.shift();
        const card4 = this.cards.deck.shift();
        // deck is now only 48, becuase we mutated this.deck when we ran shift 
        this.setState({
            playersHand: [card1, card3],
            dealersHand: [card2, card4],
        })
    }

    // this method will be sent to GameButtons and is used to
    // update the player bet. 
    // Aftey they bet, we will call draw 
    playerBet(amount){
        // this.state.wager += amount <--- this is BAD!!
        const newWager = this.state.wager + amount;
        const newBankRoll = this.state.bankroll - amount;
        this.setState({
            wager: newWager,
            bankroll: newBankRoll,
        })
        this.draw();
    }

    // draw is called whenever a new community card needs to be drawn.
    draw(){
        // we have to use Object.assign (or ...) to make a separate copy of state
        let communityNewHand = Object.assign([], this.state.communityCard);
        // const communityNewHand = this.statecommunityCards;
        if(communityNewHand[0] === 'blue_back'){
            //this is the first draw. so draw 3 cards
            communityNewHand = [this.cards.deck.shift(), this.cards.deck.shift(), this.cards.deck.shift()]
        }else{
            communityNewHand.push(this.cards.deck.shift());
        }
        this.setState({
            communityCard: communityNewHand
        })
    }

    render(){
        return(
            <div className="col-sm-12 the-table">
                <div className="col-sm-12 text-center">
                    Current wage ${this.state.wager}
                    Current bankroll ${this.state.bankroll}
                </div>
                <PokerHand cards={this.state.dealersHand} />
                <PokerHand cards={this.state.communityCard} /> 
                <PokerHand cards={this.state.playersHand} />
                <GameButtons dealFunction={this.prepDeck} betFunction={this.playerBet} />
            </div>
        )
    }
}


export default PokerTable;