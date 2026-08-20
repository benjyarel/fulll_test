import { CopyIcon } from "./icons/CopyIcon"
import { TrashIcon } from "./icons/TrashIcon"
import { useSelection } from "../contexts/SelectionContext"
import style from "./Toolbox.module.css"

export const Toolbox = ({ totalCount }: { totalCount: number }) => {
  const { selectedItems, isSelectAllMode } = useSelection()
  const selectedCount = isSelectAllMode ? totalCount : selectedItems.size

  return (
    <div className={style.toolbox}>
      <div> {selectedCount} elements selected</div>
      <div className={style.actions}>
        <button type="button" aria-label="Duplicate selection">
          <CopyIcon />
        </button>
        <button type="button" aria-label="Delete selection">
          <TrashIcon />
        </button>
      </div>
    </div>
  )
}
