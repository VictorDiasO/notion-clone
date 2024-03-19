import {
  DefaultMainMenu,
  DefaultMainMenuContent,
  TldrawUiMenuGroup,
  TldrawUiMenuItem,
  useEditor,
} from "tldraw";

export default function CustomMainMenu() {
  const editor = useEditor();

  return (
    <DefaultMainMenu>
      <TldrawUiMenuGroup id="save">
        <TldrawUiMenuItem
          id="save"
          label="Save on Cloud"
          icon="external-link"
          readonlyOk
          onSelect={() => {
            const snapshot = editor.store.getSnapshot();
            const stringifiedSnapshot = JSON.stringify(snapshot);
            console.log(stringifiedSnapshot);
          }}
        />
      </TldrawUiMenuGroup>
      <DefaultMainMenuContent />
    </DefaultMainMenu>
  );
}
