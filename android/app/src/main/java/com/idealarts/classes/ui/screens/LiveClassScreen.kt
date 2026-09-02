package com.idealarts.classes.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Radio
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.idealarts.classes.ui.theme.LiveRed
import com.idealarts.classes.ui.theme.Navy800
import com.idealarts.classes.ui.theme.Teal600

@Composable
fun LiveClassScreen(
    modifier: Modifier = Modifier,
    onOpenLiveRoom: () -> Unit
) {
    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text("LIVE STUDIOS", color = LiveRed, fontSize = 11.sp, fontWeight = FontWeight.ExtraBold)
                    Text("Live Art Streaming", style = MaterialTheme.typography.titleLarge)
                }
                Button(
                    onClick = onOpenLiveRoom,
                    colors = ButtonDefaults.buttonColors(containerColor = Teal600),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Icon(Icons.Default.Radio, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text("Enter Room", fontSize = 12.sp)
                }
            }
        }

        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(160.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(Navy800),
                        contentAlignment = Alignment.Center
                    ) {
                        IconButton(
                            onClick = onOpenLiveRoom,
                            modifier = Modifier
                                .size(50.dp)
                                .clip(RoundedCornerShape(100.dp))
                                .background(Teal600)
                        ) {
                            Icon(Icons.Default.PlayArrow, contentDescription = "Play", tint = Color.White)
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Text("Sketching • 90 Mins", color = Teal600, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    Text(
                        "Perspective Drawing & Vanishing Points",
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp
                    )
                    Text(
                        "Prof. Ramesh Kulkarni (142 live students)",
                        fontSize = 12.sp,
                        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f)
                    )
                }
            }
        }
    }
}
