export enum AssetType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  BINARY = 'BINARY',
  FOLDER = 'FOLDER',
}

export enum USER_TYPE {
  USER = 'USER',
  ADMIN = 'ADMIN',
  PARTNER = 'PARTNER',
}

export enum ORDER_STATUS {
  PENDING = 'PENDING',
  ACCEPT = 'ACCEPT',
  SHIPPING = 'SHIPPING',
  COMPLETED = 'COMPLETED',
  CANCEL = 'CANCEL',
  RETURN = 'RETURN',
}

export enum DELETE_TYPE {
  SOFT = 'SOFT',
  HARD = 'HARD',
}

export enum RESPONSE_MESSAGER {
  SUCCESS = 'SUCCESS',
  FAILSE = 'FAILSE',
  FORBIDDEN_RESOURCE = 'FORBIDDEN_RESOURCE',
}

export enum OTP_TYPE {
  FORGOT = 'FORGOT',
  REGISTER = 'REGISTER',
}

export enum STORE_TYPE {
  COFFE = 'COFFE',
}

export enum AUTH_METHOD_TYPE {
  NORMAL = 'NORMAL',
  GOOGLE = 'GOOGLE',
}

export enum STORE_STATUS {
  PENDING = 'PENDING',
  ACCEPT = 'ACCEPT',
  BLOCK = 'BLOCK',
  CLOSE = 'CLOSE',
}

export enum NOTIFY_TYPE {
  SUPPORT = 'SUPPORT',
  NOTIFY = 'NOTIFY',
}
