package com.idealarts.classes.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.idealarts.classes.ui.theme.*

@Composable
fun LiveRoomScreen(
    onClose: () -> Unit
) {
    var isHandRaised by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Navy900)
    ) {
        // Top Stream App Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Surface(
                    color = LiveRed,
                    shape = RoundedCornerShape(4.dp)
                ) {
                    Text("LIVE", color = Color.White, fontWeight = FontWeight.ExtraBold, fontSize = 10.sp, modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp))
                }
                Spacer(modifier = Modifier.width(8.dp))
                Text("Perspective Drawing", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 13.sp)
            }
            IconButton(onClick = onClose) {
                Icon(Icons.Default.Close, contentDescription = "Close", tint = Color.White)
            }
        }

        // Simulated 16:9 Video Canvas
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(210.dp)
                .background(Color.Black),
            contentAlignment = Alignment.Center
        ) {
            Text("Easel Multi-Angle Stream [1080p HD]", color = Color.White.copy(alpha = 0.7f), fontSize = 12.sp)
        }

        // Live Chat Drawer Container
        Column(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .background(DarkAppBg)
                .padding(12.dp)
        ) {
            Text("Live Classroom Discussion", color = Teal300, fontWeight = FontWeight.Bold, fontSize = 12.sp)
            Spacer(modifier = Modifier.height(8.dp))

            LazyColumn(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                item {
                    Surface(
                        color = Navy800,
                        shape = RoundedCornerShape(8.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            "Prof. Ramesh: Focus on the eye-level horizon guide line.",
                            color = Color.White,
                            fontSize = 12.sp,
                            modifier = Modifier.padding(8.dp)
                        )
                    }
                }
            }

            // Action Row: Raise Hand & Send
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Button(
                    onClick = { isHandRaised = !isHandRaised },
                    colors = ButtonDefaults.buttonColors(containerColor = if (isHandRaised) LiveRed else Teal600),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Icon(Icons.Default.PanTool, contentDescription = "Raise Hand", modifier = Modifier.size(16.dp))
                }

                TextField(
                    value = "",
                    onValueChange = {},
                    placeholder = { Text("Ask teacher...", fontSize = 12.sp) },
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(10.dp)
                )
            }
        }
    }
}
