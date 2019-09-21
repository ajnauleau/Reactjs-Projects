import React from 'react';
import {StarRating} from "./StarRating";
const { Component } = React;

export class Color extends Component {

    componentWillMount() {
        this.style = { backgroundColor: "#CCC" }
    }

    shouldComponentUpdate(nextProps) {
        const { rating } = this.props
        return rating !== nextProps.rating
    }

    componentWillUpdate(nextProps) {
        const { title, rating } = this.props
        this.style = null
        this.refs.title.style.backgroundColor = "red"
        this.refs.title.style.color = "white"
        alert(`${title}: rating ${rating} -> ${nextProps.rating}`)
    }

    componentDidUpdate(prevProps) {
        const { title, rating } = this.props
        const status = (rating > prevProps.rating) ? 'better' : 'worse'
        console.log(`${title} is getting ${status}`)
        this.refs.title.style.backgroundColor = ""
        this.refs.title.style.color = "black"
    }

    render() {
        const { title, color, rating, onRate } = this.props;
        return (
            <section className="color" style={this.style}>
                <h1 ref="title">{title}</h1>
                <div className="color"
                     style={{ backgroundColor: color }}>
                    <p></p>
                </div>
                <div>
                    <StarRating starsSelected={rating} onRate={onRate} />
                </div>
            </section>
        )
    }
}
