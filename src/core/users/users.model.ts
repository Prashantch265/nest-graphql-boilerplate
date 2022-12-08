import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user model' })
export class User {
  @Field({ description: 'full name of user' })
  fullName: string;

  @Field({ description: 'contact no. of user' })
  contact: string;

  @Field((type) => String, { description: 'user email' })
  email: string;

  @Field((type) => String)
  password: string;

  @Field((type) => String)
  userName: string;
}
