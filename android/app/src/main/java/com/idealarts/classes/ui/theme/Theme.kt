package com.idealarts.classes.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = Teal300,
    onPrimary = Navy900,
    primaryContainer = Navy800,
    onPrimaryContainer = Teal50,
    secondary = Teal500,
    background = DarkAppBg,
    surface = DarkSurface,
    onBackground = OffWhiteBg,
    onSurface = OffWhiteBg,
    outline = DarkBorder
)

private val LightColorScheme = lightColorScheme(
    primary = Teal600,
    onPrimary = CardSurfaceLight,
    primaryContainer = Teal50,
    onPrimaryContainer = Teal700,
    secondary = Navy800,
    background = OffWhiteBg,
    surface = CardSurfaceLight,
    onBackground = Navy900,
    onSurface = Navy900,
    outline = SubtleBorderLight
)

@Composable
fun IdealArtsClassesTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.background.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
