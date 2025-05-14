package com.project.todo.controller;

import com.project.todo.domain.Task;
import com.project.todo.exception.TaskNotFoundException;
import com.project.todo.service.ITaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TaskController {

    private final ITaskService iTaskService;

    @Autowired
    public TaskController(ITaskService iTaskService) {
        this.iTaskService = iTaskService;
    }

    // Save a new task
    @PostMapping("/save")
    public ResponseEntity<Task> insertTask(@RequestBody Task task) {
        Task savedTask = iTaskService.saveTask(task);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    // Fetch tasks by userId
    @PostMapping("/fetch")
    public ResponseEntity<List<Task>> fetchTask(@RequestBody Task task) throws TaskNotFoundException {
        List<Task> taskList = iTaskService.fetchTask(task);
        return new ResponseEntity<>(taskList, HttpStatus.OK);
    }

    // Fetch tasks by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Task>> fetchByCategory(@PathVariable String category) {
        return new ResponseEntity<>(iTaskService.fetchByCategory(category), HttpStatus.OK);
    }

    // Fetch tasks by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Task>> fetchByStatus(@PathVariable String status) {
        return new ResponseEntity<>(iTaskService.fetchByStatus(status), HttpStatus.OK);
    }

    // Fetch tasks by due date (format: yyyy-MM-dd)
    @GetMapping("/due/{date}")
    public ResponseEntity<List<Task>> fetchByDueDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return new ResponseEntity<>(iTaskService.fetchByDueDate(date), HttpStatus.OK);
    }

    // Update an existing task
    @PutMapping("/update")
    public ResponseEntity<Task> updateTask(@RequestBody Task task) {
        Task updatedTask = iTaskService.saveTask(task);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    // Delete a task by taskNo
    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable String  taskId) {
        // You can add this method in service layer too
        // e.g. iTaskService.deleteTaskById(taskNo);
        return new ResponseEntity<>("Task deleted with ID: " + taskId, HttpStatus.OK);
    }
}
