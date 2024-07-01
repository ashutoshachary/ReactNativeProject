import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Button } from 'react-native'

export default function UseRefDemo() {
  const intervalRef = useRef()
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    intervalRef.current = setInterval(
      () => setCount((count) => count + 1),
      1000
    )

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  const stopInterval = () => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
  }

  const startInterval = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(
        () => setCount((count) => count + 1),
        1000
      )
      setIsRunning(true)
    }
  }

  const resetCounter = () => {
    clearInterval(intervalRef.current)
    setCount(0)
    setIsRunning(false)
  }

  return (
    <View>
      <Text style={{ fontSize: 120 }}>{count}</Text>
      <Button
        title="Stop"
        onPress={stopInterval}
      />
      <Button
        title="Start"
        onPress={startInterval}
      />
      <Button
        title="Reset"
        onPress={resetCounter}
      />
    </View>
  )
}
