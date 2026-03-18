"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
type PipelineStage = {
  id: number;
  name: string;
  order: number;
  isArchived: boolean;
};

const mockStages: PipelineStage[] = [
  { id: 1, name: "New", order: 1, isArchived: false },
  { id: 2, name: "Qualified", order: 2, isArchived: false },
  { id: 3, name: "Proposal", order: 3, isArchived: false },
  { id: 4, name: "Closed", order: 4, isArchived: false },
];

export default function PipelineClient() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // TODO: Fetch stages from server, order by .order ASC
    setTimeout(() => {
      setStages(mockStages);
      setLoading(false);
    }, 400);
  }, []);

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
          Failed to load stages: {error}
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center gap-2 mb-4">
        <div />
        <Button onClick={() => setDialogOpen(true)} icon={<Plus size={18} />}>
          Add Stage
        </Button>
      </div>
      {stages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-semibold">No pipeline stages yet.</p>
          <Button onClick={() => setDialogOpen(true)}>Add First Stage</Button>
        </div>
      ) : (
        <div className="rounded border bg-background mb-4">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/70">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Order</th>
                <th className="text-center p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stages.map((stage) => (
                <tr
                  key={stage.id}
                  className="border-b last:border-b-0 hover:bg-primary/5 transition-colors"
                >
                  <td className="px-3 py-2 font-medium">{stage.name}</td>
                  <td className="px-3 py-2">{stage.order}</td>
                  <td className="px-3 py-2 text-center">
                    {/* Edit, archive, reorder actions TODO: implement */}
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
            <DialogTitle>Add Pipeline Stage</DialogTitle>
          </DialogHeader>
          <div>
            <p className="text-muted-foreground">
              (Stage creation form – coming soon with backend actions)
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}