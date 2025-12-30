import { RecipeForm } from "@/app/components/recipes/form/RecipeForm";
import { FormPageShell } from "@/app/components/recipes/form/FormPageShell";

export default function CreateRecipePage() {
  return (
    <FormPageShell title="Create recipe">
      <RecipeForm mode="create" />
    </FormPageShell>
  );
}
