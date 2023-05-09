import * as React from 'react'
import Svg, { Path, Circle, Defs, G } from 'react-native-svg'
import { View } from 'react-native'
import { MD3Theme } from 'react-native-paper/lib/typescript/src/types'

const ProfileSvg: React.FC<{ PaperTheme: MD3Theme }> = ({ PaperTheme }) => {
  const originalWidth = 202
  const originalHeight = 155
  const aspectRatio = originalWidth / originalHeight

  return (
    <View
      style={{
        aspectRatio,
        // justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={originalWidth}
        height={originalHeight}
        fill="none"
        viewBox={`0 0 ${originalWidth} ${originalHeight}`}
      >
        <Circle cx={100} cy={69} r={69} fill={PaperTheme.colors.primary} />
        <Path
          fill="#E0E0E0"
          d="M15.384 61.966c-.84-3.224-4.615-2.878-4.615-2.878l.104 2.187c2.203-.46 3.567 2.417 3.567 2.417l.944-1.726Z"
        />
        <Path
          fill="#E0E0E0"
          d="M166.353 95.052c-.974-3.406-5.353-3.04-5.353-3.04l.122 2.31c2.554-.486 4.136 2.555 4.136 2.555l1.095-1.825Z"
        />
        <Path
          fill="#E0E0E0"
          d="M201.885 33.496c-1.434-5.017-7.885-4.48-7.885-4.48l.179 3.405c3.764-.716 6.093 3.763 6.093 3.763l1.613-2.688Z"
        />
        <Path
          fill={PaperTheme.colors.primary}
          d="M168.41 9.206c0 1.26-.945 2.206-2.205 2.206-1.26 0-2.205-.945-2.205-2.206 0-1.26.945-2.206 2.205-2.206 1.26 0 2.205.945 2.205 2.206ZM178.41 62.206c0 1.26-.945 2.206-2.205 2.206-1.26 0-2.205-.945-2.205-2.206 0-1.26.945-2.206 2.205-2.206 1.26 0 2.205.945 2.205 2.206Z"
        />
        <Path
          fill={PaperTheme.colors.primary}
          d="M5.41 99.206c0 1.261-.945 2.206-2.205 2.206-1.26 0-2.205-.945-2.205-2.206C1 97.946 1.945 97 3.205 97c1.26 0 2.205.945 2.205 2.206Z"
        />
        <Path
          fill={PaperTheme.colors.primary}
          d="M5.952 29.746c0 1.701-1.276 2.977-2.976 2.977S0 31.447 0 29.746c0-1.701 1.275-2.977 2.976-2.977 1.7 0 2.976 1.276 2.976 2.977Z"
        />
        <Path
          fill="#E0E0E0"
          d="M34.885 4.496C33.451-.52 27 .016 27 .016l.18 3.405c3.762-.716 6.092 3.763 6.092 3.763l1.613-2.688Z"
        />
        <G filter="url(#a)">
          <Path
            fill={PaperTheme.colors.primary}
            d="M57.022 25.123h94.231l.06-.089c4.093-4.921 4.093-12.037 0-16.929l-.06-.089H57.021l.475.504c4.36 4.715 4.182 12.038-.386 16.514l-.088.09Z"
          />
          <Path
            fill={PaperTheme.colors.background}
            d="M132.477 134.562H46.432V17.156c0-5.485 4.449-9.932 9.936-9.932h84.177s8.75-.504 8.572 0c-6.14.119-5.814 17.107-5.814 17.107v99.38c0 6.018-4.864 10.851-10.826 10.851Z"
          />
          <Path
            fill={PaperTheme.colors.primary}
            d="M132.361 134.562H38.129l-.06-.089c-4.092-4.922-4.092-12.037 0-16.929l.06-.089h94.232l-.474.504c-4.361 4.684-5.102 12.719.474 16.603 3.856 0 0 0 0 0Z"
          />
          <Circle
            cx={96.59}
            cy={24.167}
            r={11.746}
            fill={PaperTheme.colors.primary}
          />
          <Path
            fill={PaperTheme.colors.primary}
            d="M134.054 47.993H59.22v1.986h74.834v-1.986ZM134.054 57.806H59.22v1.987h74.834v-1.986ZM134.054 67.65H59.22v1.986h74.834V67.65ZM134.054 77.463H59.22v1.987h74.834v-1.987ZM134.054 87.276H59.22v1.987h74.834v-1.987ZM134.054 106.933H59.22v1.986h74.834v-1.986ZM134.054 97.09H59.22v1.986h74.834V97.09Z"
          />
        </G>
        <Defs></Defs>
      </Svg>
    </View>
  )
}
export default ProfileSvg
