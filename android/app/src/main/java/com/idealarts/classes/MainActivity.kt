package com.idealarts.classes

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import com.idealarts.classes.ui.components.BottomNavBar
import com.idealarts.classes.ui.screens.HomeScreen
import com.idealarts.classes.ui.screens.LibraryScreen
import com.idealarts.classes.ui.screens.LiveClassScreen
import com.idealarts.classes.ui.screens.LiveRoomScreen
import com.idealarts.classes.ui.screens.ProfileScreen
import com.idealarts.classes.ui.screens.SplashScreen
import com.idealarts.classes.ui.theme.IdealArtsClassesTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            IdealArtsClassesTheme {
                MainAppContainer()
            }
        }
    }
}

@Composable
fun MainAppContainer() {
    var isAuthenticated by remember { mutableStateOf(false) }
    var currentTab by remember { mutableStateOf("home") }
    var isLiveRoomOpen by remember { mutableStateOf(false) }

    if (!isAuthenticated) {
        SplashScreen(onFinishAuth = { isAuthenticated = true })
    } else if (isLiveRoomOpen) {
        LiveRoomScreen(onClose = { isLiveRoomOpen = false })
    } else {
        Scaffold(
            modifier = Modifier.fillMaxSize(),
            bottomBar = {
                BottomNavBar(
                    currentTab = currentTab,
                    onSelectTab = { currentTab = it }
                )
            }
        ) { innerPadding ->
            when (currentTab) {
                "home" -> HomeScreen(
                    modifier = Modifier.padding(innerPadding),
                    onOpenLive = { isLiveRoomOpen = true }
                )
                "live" -> LiveClassScreen(
                    modifier = Modifier.padding(innerPadding),
                    onOpenLiveRoom = { isLiveRoomOpen = true }
                )
                "library" -> LibraryScreen(
                    modifier = Modifier.padding(innerPadding)
                )
                "profile" -> ProfileScreen(
                    modifier = Modifier.padding(innerPadding),
                    onLogout = { isAuthenticated = false }
                )
            }
        }
    }
}
