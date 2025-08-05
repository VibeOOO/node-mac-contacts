declare module 'node-mac-contacts' {
  export type ContactAuthStatus = 'notDetermined' | 'restricted' | 'denied' | 'authorized';

  export interface ContactPhone {
    label?: string;
    value: string;
  }

  export interface ContactEmail {
    label?: string;
    value: string;
  }

  export interface RawContact {
    identifier: string;
    firstName?: string;  // The actual API returns firstName
    lastName?: string;   // The actual API returns lastName
    givenName?: string;  // May also be present
    familyName?: string; // May also be present
    middleName?: string;
    phoneNumbers?: ContactPhone[];
    emailAddresses?: ContactEmail[];
    birthday?: string;
    organizationName?: string;
    jobTitle?: string;
    departmentName?: string;
    note?: string;
    contactImage?: string;
    contactThumbnailImage?: string;
    instantMessageAddresses?: any[];
    socialProfiles?: any[];
    urlAddresses?: any[];
  }

  export interface ContactData {
    givenName?: string;
    familyName?: string;
    middleName?: string;
    phoneNumbers?: ContactPhone[];
    emailAddresses?: ContactEmail[];
    birthday?: string;
    organizationName?: string;
    jobTitle?: string;
    departmentName?: string;
    note?: string;
  }

  export interface ContactsListener extends NodeJS.EventEmitter {
    setup(): void;
    remove(): void;
    isListening(): boolean;
  }

  export function getAuthStatus(): ContactAuthStatus;
  export function requestAccess(): Promise<void>;
  export function getAllContacts(properties?: string[]): RawContact[];
  export function getContactsByName(name: string, properties?: string[]): RawContact[];
  export function addNewContact(contact: ContactData): string;
  export function updateContact(contact: ContactData & { identifier: string }): boolean;
  export function deleteContact(contact: { identifier?: string; name?: string }): boolean;
  export const listener: ContactsListener;
}