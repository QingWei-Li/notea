import { TextFieldProps } from '@material-ui/core'
import { FC } from 'react'
import { DailyNotes } from './daily-notes'
import { Language } from './language'
import { Theme } from './theme'
import { ImportOrExport } from './import-or-export'
import { SnippetInjection } from './snippet-injection'
import useI18n from 'libs/web/hooks/use-i18n'
import { SettingsHeader } from './settings-header'

export const defaultFieldConfig: TextFieldProps = {
  fullWidth: true,
  margin: 'normal',
  variant: 'outlined',
  InputLabelProps: {
    shrink: true,
  },
}

export const SettingsContainer: FC = () => {
  const { t } = useI18n()

  return (
    <section>
      <SettingsHeader id="basic" title={t('Basic')}></SettingsHeader>
      <DailyNotes></DailyNotes>
      <Language></Language>
      <Theme></Theme>
      <hr />
      <SettingsHeader
        id="import-and-export"
        title={t('Import & Export')}
        description={t([
          'Import a zip file containing markdown files to this location, or export all pages from this location.',
        ])}
      ></SettingsHeader>

      <ImportOrExport></ImportOrExport>
      <hr />
      <SettingsHeader
        id="snippet-injection"
        title={t('Snippet injection')}
        description={t([
          'Inject analytics or other scripts into the HTML of your site.',
        ])}
      ></SettingsHeader>
      <SnippetInjection></SnippetInjection>
    </section>
  )
}
