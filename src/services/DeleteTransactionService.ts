// import AppError from '../errors/AppError';

import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactions = await getRepository(Transaction);
    const transaction = await transactions.findOne({ id });

    if (!transaction) {
      throw new AppError('Transaction not found', 401);
    }
    transactions.delete([transaction.id]);
  }
}

export default DeleteTransactionService;
