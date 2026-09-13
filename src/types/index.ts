export interface Guest {
  id: string;
  name: string;
  phone?: string;
  status: 'sent' | 'pending';
  generatedUrl: string;
  createdAt: string;
}

export interface RsvpMessage {
  id: string;
  name: string;
  attendance: 'hadir' | 'ragu' | 'tidak_hadir';
  guestCount: number;
  message: string;
  createdAt: string;
}

export interface EventDetail {
  title: string;
  dateStr: string;
  dayStr: string;
  timeStr: string;
  location: string;
  address: string;
  mapUrl: string;
}
