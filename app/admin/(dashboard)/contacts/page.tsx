'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  MailOpen,
  Trash2,
  CheckCheck,
  Clock,
  Building2,
  Phone,
  Eye,
  Filter,
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject: string;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
}

type FilterType = 'all' | 'unread' | 'read' | 'replied';

export default function ContactsManagementPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [contacts, filter]);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilter = () => {
    let filtered = contacts;
    switch (filter) {
      case 'unread':
        filtered = contacts.filter((c) => !c.read);
        break;
      case 'read':
        filtered = contacts.filter((c) => c.read);
        break;
      case 'replied':
        filtered = contacts.filter((c) => c.replied);
        break;
      default:
        filtered = contacts;
    }
    setFilteredContacts(filtered);
  };

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });
      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const markAsReplied = async (id: string) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replied: true }),
      });
      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error marking as replied:', error);
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Adakah anda pasti mahu memadam mesej ini?')) return;

    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchContacts();
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const stats = {
    total: contacts.length,
    unread: contacts.filter((c) => !c.read).length,
    replied: contacts.filter((c) => c.replied).length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Mesej Hubungan</h1>
        <p className="text-muted-foreground mt-1">
          Urus semua mesej daripada borang hubungan
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Jumlah Mesej
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Belum Dibaca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {stats.unread}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sudah Dibalas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {stats.replied}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Tapis Mesej
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Semua ({contacts.length})
            </Button>
            <Button
              variant={filter === 'unread' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Belum Dibaca ({stats.unread})
            </Button>
            <Button
              variant={filter === 'read' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('read')}
            >
              Sudah Dibaca ({contacts.length - stats.unread})
            </Button>
            <Button
              variant={filter === 'replied' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('replied')}
            >
              Sudah Dibalas ({stats.replied})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Message List */}
        <Card>
          <CardHeader>
            <CardTitle>Senarai Mesej ({filteredContacts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredContacts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Tiada mesej untuk ditunjukkan
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedContact?.id === contact.id
                        ? 'bg-primary/10 border-primary'
                        : 'hover:bg-accent'
                    } ${!contact.read ? 'border-l-4 border-l-orange-500' : ''}`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {!contact.read ? (
                            <Mail className="h-4 w-4 text-orange-500" />
                          ) : (
                            <MailOpen className="h-4 w-4 text-muted-foreground" />
                          )}
                          <h3 className="font-semibold truncate">
                            {contact.name}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {contact.subject}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {contact.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(contact.createdAt).toLocaleDateString('ms-MY', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Badge>
                          {contact.replied && (
                            <Badge variant="default" className="text-xs">
                              <CheckCheck className="h-3 w-3 mr-1" />
                              Dibalas
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right: Message Details */}
        <Card>
          <CardHeader>
            <CardTitle>Butiran Mesej</CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedContact ? (
              <div className="text-center py-12 text-muted-foreground">
                Pilih mesej untuk melihat butiran
              </div>
            ) : (
              <div className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Nama
                    </label>
                    <p className="text-lg font-semibold">
                      {selectedContact.name}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-primary hover:underline"
                      >
                        {selectedContact.email}
                      </a>
                    </p>
                  </div>

                  {selectedContact.phone && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Telefon
                      </label>
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {selectedContact.phone}
                      </p>
                    </div>
                  )}

                  {selectedContact.organization && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Organisasi
                      </label>
                      <p className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        {selectedContact.organization}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Subjek
                    </label>
                    <p className="font-medium">{selectedContact.subject}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Mesej
                    </label>
                    <div className="mt-1 p-4 bg-muted rounded-lg whitespace-pre-wrap">
                      {selectedContact.message}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Diterima Pada
                    </label>
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {new Date(selectedContact.createdAt).toLocaleString('ms-MY', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Badge variant={selectedContact.read ? 'secondary' : 'default'}>
                      {selectedContact.read ? 'Sudah Dibaca' : 'Belum Dibaca'}
                    </Badge>
                    <Badge variant={selectedContact.replied ? 'default' : 'outline'}>
                      {selectedContact.replied ? 'Sudah Dibalas' : 'Belum Dibalas'}
                    </Badge>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(selectedContact.email)}&su=${encodeURIComponent('Re: ' + selectedContact.subject)}&body=${encodeURIComponent('\n\n---\nBalasan untuk: ' + selectedContact.name + '\nMesej asal:\n' + selectedContact.message)}`;
                      window.open(gmailComposeUrl, '_blank');
                    }}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Balas Email (Gmail)
                  </Button>

                  {!selectedContact.read && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => markAsRead(selectedContact.id)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Tanda Sebagai Dibaca
                    </Button>
                  )}

                  {!selectedContact.replied && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => markAsReplied(selectedContact.id)}
                    >
                      <CheckCheck className="mr-2 h-4 w-4" />
                      Tanda Sebagai Dibalas
                    </Button>
                  )}

                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={() => deleteContact(selectedContact.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Padam Mesej
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
