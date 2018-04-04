import Investor from '../models/investor'
import Account from '../models/account'
import moment from 'moment'
import { Errors } from './errors'
import uniq from 'lodash/uniq'

const getInvestors = async (args, skip, limit, sortBy) => {
  const query = Investor.find(args).populate('referral_id').sort(sortBy).skip(skip).limit(limit)
  const total_ = Investor.find(args).count()
  const [result, total] = await Promise.all([query, total_])
  const resultWithAccountPromises = result.map(async r => {
    // const accs = await Account.find({ investor_id: r._id }).populate('package_id')
    // const accs_ = accs.map(a => {
    //   a.package = a.package_id
    //   a.package_id = a.populated('package_id')
    //   return a
    // })
    // r.accounts = accs_
    // r.referralInvestor = r.referral_id
    // r.referral_id = r.populated('referral_id')
    // return r
  })
  const _result = await Promise.all(resultWithAccountPromises)
  // console.log(_result)
  return { items: _result, total }
}

const addInvestor = admin_user => async (_id, name, email, address, create_time) => {
  const existInvestor = await Investor.findByIdAsync(_id)
  if (existInvestor) {
    throw Errors.ID_EXISTS()
  }

  const url = avatar ? await uploadToAWS(avatar.path, avatar.name) : undefined
  const investor = new Investor({
    _id,
    name,
    email,
    address,
    create_time: create_time || moment().unix()
  })
  return investor.saveAsync()
}

const updateInvestor = admin_user => async (_id, data) => {
  //data = { name, email, address }
  
  return Investor
    .findByIdAndUpdateAsync(_id, { $set: data }, { new: true })
}

const deleteInvestor = admin_user => _id => {
  return Investor
    .findById(_id)
    .removeAsync()
}

export {
  addInvestor,
  updateInvestor,
  deleteInvestor,
  getInvestors 
}
