import {
  DefaultQuickActions,
  DefaultQuickActionsContent,
  TldrawUiMenuItem,
  useEditor,
} from "tldraw";
import "tldraw/tldraw.css";

export default function CustomQuickActions() {
  const editor = useEditor();

  return (
    <DefaultQuickActions>
      <DefaultQuickActionsContent />
      <TldrawUiMenuItem
        id="code"
        icon="code"
        onSelect={() => {
          const snapshot = editor.store.getSnapshot();
          const stringifiedSnapshot = JSON.stringify(snapshot);
          console.log(stringifiedSnapshot);
        }}
      />
    </DefaultQuickActions>
  );
}
