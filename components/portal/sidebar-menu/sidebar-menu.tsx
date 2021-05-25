import { Menu } from '@material-ui/core'
import { FC, useMemo } from 'react'
import IconClipboardCopy from 'heroicons/react/outline/ClipboardCopy'
import IconStar from 'heroicons/react/outline/Star'
import IconTrash from 'heroicons/react/outline/Trash'
import PortalState from 'libs/web/state/portal'
import useI18n from 'libs/web/hooks/use-i18n'
import { NOTE_PINNED } from 'libs/shared/meta'
import { NoteModel } from 'libs/shared/note'
import { Item, SidebarMenuItem, MENU_HANDLER_NAME } from './sidebar-menu-item'

const SidebarMenu: FC = () => {
  const { t } = useI18n()
  const {
    menu: { close, anchor, data },
  } = PortalState.useContainer()

  const MENU_LIST: Item[] = useMemo(
    () => [
      {
        text: t('Remove'),
        icon: <IconTrash />,
        handler: MENU_HANDLER_NAME.REMOVE_NOTE,
      },
      {
        text: t('Copy Link'),
        icon: <IconClipboardCopy />,
        handler: MENU_HANDLER_NAME.COPY_LINK,
      },
      {
        text: t('Add to Favorites'),
        icon: <IconStar />,
        handler: MENU_HANDLER_NAME.ADD_TO_FAVORITES,
        enable(item?: NoteModel) {
          return item?.pinned !== NOTE_PINNED.PINNED
        },
      },
      {
        text: t('Remove from Favorites'),
        icon: <IconStar />,
        handler: MENU_HANDLER_NAME.REMOVE_FROM_FAVORITES,
        enable(item?: NoteModel) {
          return item?.pinned === NOTE_PINNED.PINNED
        },
      },
    ],
    [t]
  )

  return (
    <Menu
      anchorEl={anchor}
      open={!!anchor}
      onClose={close}
      classes={{
        paper: 'bg-gray-200 text-gray-800',
      }}
    >
      {MENU_LIST.map((item) =>
        item.enable ? (
          item.enable(data) && <SidebarMenuItem key={item.text} item={item} />
        ) : (
          <SidebarMenuItem key={item.text} item={item} />
        )
      )}
    </Menu>
  )
}

export default SidebarMenu
