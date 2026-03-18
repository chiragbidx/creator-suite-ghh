"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoaderCircle, Plus, Search } from "lucide-react";
// Add remaining imports as backend is ready
type Lead = {
  id: number;
  name: string;
  status: string;
  value?: string;
  stage?: string;
  company?: string;
  owner?: string;
  createdAt?: string;
};

const mockLeads: Lead[] = []; // Replace with server fetching

export default function LeadsClient() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // TODO: Fetch from API/server once backend wired
    setTimeout(() => {
      setLeads(mockLeads);
      setLoading(false);
    }, 500);
  }, []);

  function handleAdd() {
    setDialogOpen(true);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  // Filtered leads for search/bar (client-side for now)
  const displayedLeads = leads.filter((lead) =>
    !query ||
    lead.name.toLowerCase().includes(query.toLowerCase()) ||
    (lead.company?.toLowerCase().includes(query.toLowerCase()))
  );

  // UI state: loading/empty/error/data
  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border-destructive border px-4 py-2 rounded">
        <span className="text-destructive font-semibold">
          Failed to load leads: {error}
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Input
            className="max-w-xs"
            placeholder="Search leads..."
            value={query}
            onChange={handleSearch}
            startIcon={<Search size={16} />}
          />
        </div>
        <Button onClick={handleAdd} icon={<Plus size={18} />}>
          Add Lead
        </Button>
      </div>
      {displayedLeads.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-semibold">No leads yet.</p>
          <p className="mb-2">Add your first lead to start tracking sales opportunities.</p>
          <Button onClick={handleAdd} size="lg">
            <Plus className="mr-2 h-4 w-4" /> Add Lead
          </Button>
        </div>
      ) : (
        <div className="rounded border bg-background">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/70">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Company</th>
                <th className="text-left p-3">Stage</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Value</th>
                <th className="text-center p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b last:border-b-0 hover:bg-primary/5 transition-colors"
                >
                  <td className="px-3 py-2 font-medium">{lead.name}</td>
                  <td className="px-3 py-2">{lead.company ?? <span className="text-muted-foreground">-</span>}</td>
                  <td className="px-3 py-2">{lead.stage ?? <span className="text-muted-foreground">-</span>}</td>
                  <td className="px-3 py-2">{lead.status}</td>
                  <td className="px-3 py-2 text-right">{lead.value || "-"}</td>
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
            <DialogTitle>Add Lead</DialogTitle>
          </DialogHeader>
          {/* Add lead form to go here */}
          <div>
            <p className="text-muted-foreground">
              (Lead creation form – coming with backend actions)
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}