export class CreateUserDto {
    fullName: string;
    age: number;
    status: 'active' | 'inactive';
  }
  
  export class UpdateUserStatusDto {
    status: 'inactive';
  }
  