import { CopyIcon } from "./icons/CopyIcon"
import { TrashIcon } from "./icons/TrashIcon"
import style from "./Toolbox.module.css"

export const Toolbox = ({ selectedNumber }: { selectedNumber: number }) => {
  return (
    <div className={style.toolbox}>
      <div> {selectedNumber} elements selected</div>
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
