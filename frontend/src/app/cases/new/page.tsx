"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateCase } from "@/hooks/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function CreateCasePage() {
  const router = useRouter();
  const { mutate: createCase, isPending } = useCreateCase();

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    as_of_date: string;
    jurisdiction: "INDIA" | "INTERNATIONAL" | "BOTH";
  }>({
    title: "",
    description: "",
    as_of_date: new Date().toISOString().split("T")[0],
    jurisdiction: "INDIA",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCase(formData, {
      onSuccess: (data) => {
        // Redirect to the newly created case's analysis/verification page
        router.push(`/cases/${data.id}/verify`);
      },
      onError: (error) => {
        console.error("Failed to create case", error);
        alert("Failed to connect to the backend API.");
      },
    });
  };

  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <div className="mb-6">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          &larr; Back to Dashboard
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Start New Case Analysis</CardTitle>
          <CardDescription>
            Enter the formulation details to extract facts and begin the IP analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Case Title</label>
              <input
                id="title"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="e.g., Modified Ashwagandha Extract v2"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Formulation Description</label>
              <textarea
                id="description"
                required
                className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe the formulation, ingredients, preparation method, and any claims of novelty..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="as_of_date" className="text-sm font-medium">As-Of Date (For Rule Engine)</label>
                <input
                  type="date"
                  id="as_of_date"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.as_of_date}
                  onChange={(e) => setFormData({ ...formData, as_of_date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="jurisdiction" className="text-sm font-medium">Jurisdiction</label>
                <select
                  id="jurisdiction"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.jurisdiction}
                  onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value as "INDIA" | "INTERNATIONAL" | "BOTH" })}
                >
                  <option value="INDIA">India (Domestic Laws)</option>
                  <option value="INTERNATIONAL">International</option>
                  <option value="BOTH">Both</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Starting Analysis..." : "Extract Facts ->"}
              </Button>
            </div>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
