import Account from '../models/account'
import Investor from '../models/investor'
import moment from 'moment'
import { getId } from './util'
import { Errors } from './errors'
import _ from 'lodash'

const getAccounts = async (args, skip, limit, sortBy) => {
  const query = Account.find(args).sort(sortBy).skip(skip).limit(limit).populate('investor_id')
  const total_ = Account.find(args).count()
  const [result, total] = await Promise.all([query, total_])
  const result_ = result.map(r => {
    r.investor = r.investor_id
    return r
  })
  return {
    items: result_, total
  }
}

const addAccount = admin_user => async (amount, create_time, note, rate) => {  
  const account = new Account({
    investor_id: investorId, //investorId, 
    create_time: create_time || moment().unix()
  })

  return investor.saveAsync()
}

export {
  addAccount,
  getAccounts
}
