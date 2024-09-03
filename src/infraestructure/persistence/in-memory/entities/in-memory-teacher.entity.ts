export class InMemoryTeacherEntity {
  id: string;
  name: string;
  email: string;
  phone: string;
  expertise: string;

  // Construtor opcional
  constructor(
    id: string,
    name: string,
    email: string,
    phone: string,
    expertise: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.expertise = expertise;
  }
}
