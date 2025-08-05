declare module 'node-mac-contacts' {
  // The native code returns these exact strings (with spaces and capitalization)
  export type ContactAuthStatus = 'Not Determined' | 'Restricted' | 'Denied' | 'Authorized';

  export interface ContactPhone {
    label?: string;
    value: string;
  }

  export interface ContactEmail {
    label?: string;
    value: string;
  }

  export interface ContactUrl {
    label?: string;
    value: string;
  }

  export interface ContactAddress {
    label?: string;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }

  // The contact object returned by getAllContacts and getContactsByName
  export interface RawContact {
    identifier: string;
    firstName?: string;      // CNContactGivenName
    lastName?: string;       // CNContactFamilyName
    middleName?: string;     // CNContactMiddleName (optional property)
    nickname?: string;       // CNContactNicknameKey
    phoneNumbers?: ContactPhone[];
    emailAddresses?: ContactEmail[];
    postalAddresses?: ContactAddress[];
    birthday?: string;       // Format: YYYY-MM-DD
    organizationName?: string;
    jobTitle?: string;
    departmentName?: string;
    note?: string;
    // Optional properties that must be requested via properties parameter
    contactImage?: string;           // Base64 encoded image
    contactThumbnailImage?: string;  // Base64 encoded thumbnail
    instantMessageAddresses?: any[];
    socialProfiles?: any[];
    urlAddresses?: ContactUrl[];
  }

  // The contact data structure for creating/updating contacts
  export interface ContactData {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    nickname?: string;
    phoneNumbers?: Array<string | ContactPhone>;
    emailAddresses?: Array<string | ContactEmail>;
    urlAddresses?: Array<string | ContactUrl>;
    birthday?: string;  // Must be YYYY-MM-DD format
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
  export function addNewContact(contact: ContactData): boolean;  // Returns success boolean
  export function updateContact(contact: ContactData & { identifier: string }): boolean;
  export function deleteContact(contact: { identifier?: string; name?: string }): boolean;
  export const listener: ContactsListener;
}