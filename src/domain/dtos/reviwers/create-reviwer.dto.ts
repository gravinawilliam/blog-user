export type IRequestCreateReviwerValidatorDTO = {
  authorization: string;
};

export type IResponseCreateReviwerValidatorDTO = {
  userId: string;
};

export type ICreateReviwerDTO = {
  userId: string;
  reviwerStatus: string;
};

export type IResponseTransformerCreateReviwerDTO = {
  reviwerStatus: string;
};

export type IRequestCreateReviwerUseCaseDTO = {
  userId: string;
  reviwerStatus: string;
};

export type ICreateReviwerUseCaseResponseDTO = {
  reviwerStatus: string;
};
