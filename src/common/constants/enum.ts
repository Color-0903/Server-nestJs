export enum AssetType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  BINARY = 'BINARY',
  FOLDER = 'FOLDER',
}

export enum USER_TYPE {
  USER = 'User',
  ADMIN = 'Admin',
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
