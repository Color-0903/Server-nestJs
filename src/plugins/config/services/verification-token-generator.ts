import { Injectable } from '@nestjs/common';
import ms from 'ms';
import { ConfigService } from '../config.service';
import * as speakeasy from 'speakeasy';

/**
 * This class is responsible for generating and verifying the tokens issued when new accounts are registered
 * or when a password reset is requested.
 */
@Injectable()
export class VerificationTokenGenerator {
  constructor(private configService: ConfigService) {}

  /**
   * Generates a verification token which encodes the time of generation and concatenates it with a
   * random id.
   */
  generateVerificationToken() {
    const token = speakeasy.totp({
      secret: 'base32',
      step: this.configService.authOptions.verificationTokenDuration, // specified in seconds
    });

    return token;
  }

  /**
   * Checks the age of the verification token to see if it falls within the token duration
   * as specified in the VendureConfig.
   */
  verifyVerificationToken(token: string): boolean {
    return speakeasy.totp.verify({
      secret: 'base32',
      token,
    });
  }
}
