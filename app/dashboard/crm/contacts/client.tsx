"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";
type Contact = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
};

const mockContacts: Contact[] = [];

export default function ContactsClient() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // TODO: Fetch contacts from server
    setTimeout(() => {
      setContacts(mockContacts);
      setLoading(false);
    }, 500);
  }, []);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  const filtered = contacts.filter((c) =>
    !query ||
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    (c.email && c.email.toLowerCase().includes(query.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border-destructive border px-4 py-2 rounded">
        <span className="text-destructive font-semibold">
          Failed to load contacts: {error}
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center gap-2 mb-4">
        <Input
          className="max-w-xs"
          placeholder="Search contacts..."
          value={query}
          onChange={handleSearch}
          startIcon={<Search size={16} />}
        />
        <Button onClick={() => setDialogOpen(true)} icon={<Plus size={18} />}>
          Add Contact
        </Button>
      </div>
      {filtered.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          <p className="text-lg font-semibold">No contacts yet.</p>
          <p>Add your first team or client contact for outreach and context.</p>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>
      ) : (
        <div className="rounded border bg-background">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/70">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-center p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b last:border-b-0 hover:bg-primary/5 transition-colors"
                >
                  <td className="px-3 py-2 font-medium">{contact.name}</td>
                  <td className="px-3 py-2">{contact.email ?? <span className="text-muted-foreground">-</span>}</td>
                  <td className="px-3 py-2">{contact.phone ?? <span className="text-muted-foreground">-</span>}</td>
                  <td className="px-3 py-2 text-center">
                    {/* View, edit, archive, delete actions TODO: implement */}
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Contact</DialogTitle>
          </DialogHeader>
          {/* Add contact form will go here */}
          <div>
            <p className="text-muted-foreground">
              (Contact creation form – coming soon with backend actions)
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}