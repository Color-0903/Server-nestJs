import { DELETE_TYPE } from 'src/common/constants/enum';
import dataSource from 'src/database/data-source';

export const NativeAuthenticationMethodRepository = dataSource.getRepository('').extend({
  async updateInformationChangePassword(
    passwordHash: string,
    id: string,
    lastModifiedByUserId?: string,
  ) {
    return NativeAuthenticationMethodRepository.createQueryBuilder()
      .update()
      .set({
        passwordHash: passwordHash,
        lastModifiedByUserId: lastModifiedByUserId,
      })
      .where('id = :id', { id: id })
      .execute();
  },
  async updateIdentier(id: string, identifier: string, lastModifiedByUserId?: string) {
    return NativeAuthenticationMethodRepository.createQueryBuilder()
      .update()
      .set({
        identifier: identifier,
        lastModifiedByUserId: lastModifiedByUserId,
      })
      .where('id = :id', { id: id })
      .execute();
  },
  async getNativeAuthenticationMethodById(nativeAuthMethodId: string) {
    return NativeAuthenticationMethodRepository.createQueryBuilder('authentication_method')
      .addSelect('authentication_method.passwordHash')
      .where('id = :id', { id: nativeAuthMethodId })
      .getOne();
  },
  async deleteAuthenticationMethod(id: string, type: DELETE_TYPE) {
    return type === DELETE_TYPE.HARD
      ? await NativeAuthenticationMethodRepository.delete(id)
      : await NativeAuthenticationMethodRepository.update(id, {
          deletedAt: new Date(),
        });
  },
});
