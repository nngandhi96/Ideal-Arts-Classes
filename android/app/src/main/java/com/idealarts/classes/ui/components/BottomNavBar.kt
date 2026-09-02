package com.idealarts.classes.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Book
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Radio
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.idealarts.classes.ui.theme.LiveRed
import com.idealarts.classes.ui.theme.Teal600

data class NavItem(val id: String, val label: String, val icon: ImageVector, val isLive: Boolean = false)

@Composable
fun BottomNavBar(
    currentTab: String,
    onSelectTab: (String) -> Unit
) {
    val items = listOf(
        NavItem("home", "Home", Icons.Default.Home),
        NavItem("live", "Live Classes", Icons.Default.Radio, isLive = true),
        NavItem("library", "Library", Icons.Default.Book),
        NavItem("profile", "Profile", Icons.Default.Person)
    )

    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .navigationBarsPadding(),
        color = MaterialTheme.colorScheme.surface,
        tonalElevation = 6.dp,
        shadowElevation = 8.dp
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp, horizontal = 12.dp),
            horizontalArrangement = Arrangement.SpaceAround,
            verticalAlignment = Alignment.CenterVertically
        ) {
            items.forEach { item ->
                val isSelected = currentTab == item.id
                val animatedColor by animateColorAsState(
                    targetValue = if (isSelected) Teal600 else MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                    label = "navColor"
                )

                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center,
                    modifier = Modifier
                        .clip(RoundedCornerShape(12.dp))
                        .clickable(
                            interactionSource = remember { MutableInteractionSource() },
                            indication = null
                        ) { onSelectTab(item.id) }
                        .padding(horizontal = 12.dp, vertical = 4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(width = 44.dp, height = 28.dp)
                            .clip(RoundedCornerShape(14.dp))
                            .background(if (isSelected) Teal600.copy(alpha = 0.12f) else Color.Transparent),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = item.icon,
                            contentDescription = item.label,
                            tint = animatedColor,
                            modifier = Modifier.size(20.dp)
                        )
                        if (item.isLive) {
                            Box(
                                modifier = Modifier
                                    .align(Alignment.TopEnd)
                                    .padding(end = 4.dp, top = 2.dp)
                                    .size(7.dp)
                                    .clip(CircleShape)
                                    .background(LiveRed)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(2.dp))

                    Text(
                        text = item.label,
                        color = animatedColor,
                        style = MaterialTheme.typography.labelSmall.copy(fontSize = 11.sp)
                    )
                }
            }
        }
    }
}
