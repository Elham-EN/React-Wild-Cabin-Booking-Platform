export interface Guest {
  id: string;
  fullName: string;
  email: string;
  nationality: string;
  nationalID: string;
  countryFlag: string;
}

export interface CreateGuest {
  fullName: string;
  email: string;
}

export interface UpdatedGuest {
  nationality: string;
  nationalID: string;
  countryFlag: string;
}
