import ExchangeRate from '../models/exchangeRate'
import Hashids from 'hashids'
import { getId } from './util'
const hashids = new Hashids("QMAMA exchange rate", 6)

const addRate = admin_user => async (from_currency, to_currency, exchange_rate, date) => {
  const rate = new ExchangeRate({
    from_currency,
    to_currency,
    rate: exchange_rate,
    date
  })
  return rate
    .saveAsync()
}

const deleteRate = admin_user => _id => {
  return ExchangeRate.findById(_id)
    .removeAsync()
}

const updateRate = admin_user => (_id, data) => {
  return Investor
    .findByIdAndUpdateAsync(_id, { $set: data }, { new: true })
}

const getRates = async (args, skip, limit, sortBy) => {
  const query = ExchangeRate.find(args).sort(sortBy).skip(skip).limit(limit)
  const total_ = ExchangeRate.find(args).count()
  const [result, total] = await Promise.all([query, total_])
  return { items: result, total }
}

export {
  addRate,
  deleteRate,
  updateRate,
  getRates
}
