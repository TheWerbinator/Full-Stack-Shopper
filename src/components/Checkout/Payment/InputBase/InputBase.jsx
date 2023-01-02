import React from "react";
import './InputBase.css';
import { CARD, CARD_ICON } from '../PaymentForm/cardConstants';

class InputBase extends React.Component {
  state = {

  }

  range = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }

  handleSelect = (e) => {
    this.props.onBlur(e)
  }

  render() {

    const month = this.range(1,12);
    const year = this.range(22,32);

    let inputClass = 'input-root-payment';
    this.props.errorMessage != null ? inputClass += ' red-alert': inputClass = 'input-root-payment';

    return (
      <div>
        {this.props.name !== 'expiry' ?
          <label>
            <input className={inputClass} {...this.props} />
            {this.props.errorMessage && <div className="error-payment" >{this.props.errorMessage}</div>}
            {(!this.props.error || !this.props.error.cardError) && this.props.isCard && CARD.includes(this.props.cardType) && (
              <img 
                className="card-logo"
                src={CARD_ICON[this.props.cardType]}
                alt="card"
              />
            )}
          </label>
          : <div className="selects-wrapper">
              <label className="expiration-label">
                <select className='expiration-month' title="month" name='expiry' onChange={(e) => this.handleSelect(e)}>
                  {month.map((val) => {
                    return <option value={val}>{val}</option>
                  })}
                </select>
                <select className='expiration-year' title="year" name='expiry' onChange={(e) => this.handleSelect(e)}>
                  {year.map((val) => {
                    return <option value={val}>{val}</option>
                  })}
                </select>
              </label>
              {this.props.errorMessage && <div className="error-payment" >{this.props.errorMessage}</div>}
            </div>
        }
      </div>
      
    )
  }
}

export default InputBase;