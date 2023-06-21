import { FlashList } from '@shopify/flash-list'
import { Dimensions, View } from 'react-native'
import {
  Modal,
  Portal,
  RadioButton,
  useTheme as PaperTheme,
  Button
} from 'react-native-paper'
import { useI18nHook } from '../done/hook/i18n'
import countries from 'i18n-iso-countries'

const PickerDialog: React.FC<{
  value: string
  visible: boolean
  hideModal: () => void
  data: { label: string; value: string }[]
  onPress: (value: string) => void
  country?: boolean
}> = ({ value, visible, hideModal, data, onPress, country }) => {
  const theme = PaperTheme()
  const Direction = useI18nHook((state) => state.Direction)
  const I18n = useI18nHook((state) => state.I18n)
  const windowHeight = Dimensions.get('window').height
  const Language = useI18nHook((state) => state.Language)

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          borderRadius: theme.roundness,
          margin: 25,
          direction: Direction
        }}
      >
        <View
          style={{
            height: windowHeight / 3
          }}
        >
          <FlashList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <RadioButton.Item
                label={
                  country
                    ? countries.getName(item.value, Language, {
                        select: 'official'
                      })
                    : item.label
                }
                value={item.value}
                status={value === item.value ? 'checked' : 'unchecked'}
                onPress={() => onPress(item.value === value ? '' : item.value)}
              />
            )}
            estimatedItemSize={200}
          />

          <Button
            onPress={hideModal}
            style={{ alignSelf: 'flex-end', margin: 10 }}
          >
            {I18n.createprofile.Done}
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

export default PickerDialog
