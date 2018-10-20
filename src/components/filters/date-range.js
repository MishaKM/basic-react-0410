import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { connect } from 'react-redux'
import { filterDateRange } from '../../ac'

class DateRange extends Component {
  handleDayClick = (day) => {
    const { from, to, filterDateRange } = this.props
    filterDateRange(DateUtils.addDayToRange(day, { from, to }))
  }
  // без кнопки резет неудобно было тестировать
  handleResetClick = () => {
    const { filterDateRange } = this.props
    filterDateRange({ from: null, to: null })
  }

  render() {
    const { from, to } = this.props
    const selectedRange =
      from && to && `${from.toDateString()} - ${to.toDateString()}`
    return (
      <div className="date-range">
        <DayPicker
          selectedDays={(day) => DateUtils.isDayInRange(day, { from, to })}
          onDayClick={this.handleDayClick}
        />
        {selectedRange}
        <button onClick={this.handleResetClick}>Reset</button>
      </div>
    )
  }
}

export default connect(
  (state) => ({ ...state.articles.filters.dateRange }),
  { filterDateRange }
)(DateRange)
