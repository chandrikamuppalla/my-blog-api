import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
//import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AddWalletDto } from './dto/add-wallet.dto';
import { CreateLoyaltyAccountDto } from './dto/create-loyalty-account.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class LoyaltyService {
  constructor(private prisma: PrismaService) {}

  async createAccount(createLoyaltyAccountDto: CreateLoyaltyAccountDto) {
    try {
      return await this.prisma.loyaltyAccount.create({
        data: createLoyaltyAccountDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('A loyalty account for this customer already exists.');
      }
      throw error;
    }
  }

  async findAccountById(id: string) {
    const account = await this.prisma.loyaltyAccount.findUnique({
      where: { id },
      include: { wallets: true }, // Include all related wallets in the result
    });
    if (!account) {
      throw new NotFoundException(`Loyalty account with ID ${id} not found.`);
    }
    return account;
  }

  async addWalletToAccount(accountId: string, addWalletDto: AddWalletDto) {
    const { currencyCode, initialBalance } = addWalletDto;
    try {
      // The logic to add a wallet is to create a LoyaltyWallet with the accountId
      return await this.prisma.loyaltyWallet.create({
        data: {
          loyaltyAccountId: accountId,
          currencyCode: currencyCode.toUpperCase(),
          balance: initialBalance || 0,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002 is the unique constraint violation code
        if (error.code === 'P2002') {
          throw new ConflictException(`Wallet with currency ${currencyCode} already exists for this account.`);
        }
        // P2003 is the foreign key constraint violation code
        if (error.code === 'P2003') {
           throw new NotFoundException(`Loyalty account with ID ${accountId} not found.`);
        }
      }
      throw error;
    }
  }
}