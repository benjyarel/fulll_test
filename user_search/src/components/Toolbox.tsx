import { Checkbox } from "./Checkbox"
import { CopyIcon } from "./icons/CopyIcon"
import { TrashIcon } from "./icons/TrashIcon"
import { useSelection } from "../contexts/SelectionContext"
import style from "./Toolbox.module.css"

export const Toolbox = ({ totalCount }: { totalCount: number }) => {
  const { selectedItems, isSelectAllMode, toggleSelectAll } = useSelection()
  const selectedCount = isSelectAllMode ? totalCount : selectedItems.size
  const userLabel = selectedCount === 1 ? "user" : "users"

  return (
    <div className={style.toolbox}>
      <div className={style.selection}>
        <Checkbox
          checked={isSelectAllMode}
          onChange={toggleSelectAll}
          label="Select all users"
        />
        <span>
          {selectedCount} {userLabel} selected
        </span>
      </div>
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
