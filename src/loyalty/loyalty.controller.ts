import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { CreateLoyaltyAccountDto } from './dto/create-loyalty-account.dto';
import { AddWalletDto } from './dto/add-wallet.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('loyalty')
@Controller('loyalty')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new loyalty account for a customer' })
  @ApiResponse({ status: 200, description: 'The account has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Conflict. An account for this customer already exists.' })
  create(@Body() createLoyaltyAccountDto: CreateLoyaltyAccountDto) {
    return this.loyaltyService.createAccount(createLoyaltyAccountDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a loyalty account and its wallets by ID' })
  @ApiParam({ name: 'id', description: 'The UUID of the loyalty account.', type: 'string' })
  @ApiResponse({ status: 200, description: 'The loyalty account details.' })
  @ApiResponse({ status: 404, description: 'Loyalty account not found.' })
  findAccount(@Param('id', ParseUUIDPipe) id: string) {
    return this.loyaltyService.findAccountById(id);
  }

  @Post(':id/wallets')
  @ApiOperation({ summary: 'Add a new currency wallet to a loyalty account' })
  @ApiParam({ name: 'id', description: 'The UUID of the loyalty account.', type: 'string' })
  @ApiBody({ type: AddWalletDto })
  @ApiResponse({ status: 200, description: 'The wallet has been successfully added.' })
  @ApiResponse({ status: 404, description: 'Loyalty account not found.' })
  @ApiResponse({ status: 409, description: 'Conflict. A wallet with this currency already exists for the account.' })
  addWallet(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() addWalletDto: AddWalletDto,
  ) {
    return this.loyaltyService.addWalletToAccount(id, addWalletDto);
  }
}