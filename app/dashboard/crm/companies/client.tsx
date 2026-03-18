"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";
type Company = {
  id: number;
  name: string;
  website?: string;
};

const mockCompanies: Company[] = [];

export default function CompaniesClient() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // TODO: Fetch companies from server
    setTimeout(() => {
      setCompanies(mockCompanies);
      setLoading(false);
    }, 500);
  }, []);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  const filtered = companies.filter((c) =>
    !query ||
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    (c.website && c.website.toLowerCase().includes(query.toLowerCase()))
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
          Failed to load companies: {error}
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center gap-2 mb-4">
        <Input
          className="max-w-xs"
          placeholder="Search companies..."
          value={query}
          onChange={handleSearch}
          startIcon={<Search size={16} />}
        />
        <Button onClick={() => setDialogOpen(true)} icon={<Plus size={18} />}>
          Add Company
        </Button>
      </div>
      {filtered.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          <p className="text-lg font-semibold">No companies yet.</p>
          <p>Add your first company to track organizations and key accounts.</p>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Button>
        </div>
      ) : (
        <div className="rounded border bg-background">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/70">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Website</th>
                <th className="text-center p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((company) => (
                <tr
                  key={company.id}
                  className="border-b last:border-b-0 hover:bg-primary/5 transition-colors"
                >
                  <td className="px-3 py-2 font-medium">{company.name}</td>
                  <td className="px-3 py-2">{company.website ?? <span className="text-muted-foreground">-</span>}</td>
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
            <DialogTitle>Add Company</DialogTitle>
          </DialogHeader>
          {/* Add company form will go here */}
          <div>
            <p className="text-muted-foreground">
              (Company creation form – coming soon with backend actions)
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}