import { getRepository, getCustomRepository } from 'typeorm';
// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const categoryRepository = getRepository(Category);
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const { total } = await transactionRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError(' You do not have enough balance');
    }

    let respCategory = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!respCategory) {
      const categorySave = categoryRepository.create({
        title: category,
      });
      respCategory = await categoryRepository.save(categorySave);
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: respCategory.id,
    });

    await transactionRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
