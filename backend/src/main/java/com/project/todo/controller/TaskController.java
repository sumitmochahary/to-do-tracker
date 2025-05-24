package com.project.todo.controller;

import com.project.todo.domain.Task;
import com.project.todo.exception.TaskNotFoundException;
import com.project.todo.service.ITaskService;
import jakarta.servlet.http.HttpServletRequest;
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

    @PostMapping("/save")
    public ResponseEntity<Task> insertTask(@RequestBody Task task, HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");
        task.setUserId(userId);
        Task savedTask = iTaskService.saveTask(task);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> fetchAllTasks(){
        List<Task> tasks = iTaskService.fetchAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/fetch/{userId}")
    public ResponseEntity<List<Task>> fetchTask(@PathVariable String userId) throws TaskNotFoundException {
        List<Task> taskList = iTaskService.fetchTaskByUserId(userId);
        return new ResponseEntity<>(taskList, HttpStatus.OK);
    }

    @GetMapping("/category/{taskCategory}")
    public ResponseEntity<List<Task>> fetchByCategory(@PathVariable String taskCategory) {
        return new ResponseEntity<>(iTaskService.fetchByCategory(taskCategory), HttpStatus.OK);
    }

    @GetMapping("/status/{taskStatus}")
    public ResponseEntity<List<Task>> fetchByStatus(@PathVariable String taskStatus) {
        return new ResponseEntity<>(iTaskService.fetchByStatus(taskStatus), HttpStatus.OK);
    }

    @GetMapping("/due/{taskDueDate}")
    public ResponseEntity<List<Task>> fetchByDueDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate taskDueDate) {
        return new ResponseEntity<>(iTaskService.fetchByDueDate(taskDueDate), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable String taskId) throws TaskNotFoundException {  // Changed from int to String
        iTaskService.deleteTask(taskId);
        return new ResponseEntity<>("Task deleted with ID: " + taskId, HttpStatus.OK);
    }

    @GetMapping("/status/archived")
    public ResponseEntity<List<Task>> fetchArchivedTasks() {
        List<Task> archivedTasks = iTaskService.fetchArchivedTasks();
        return new ResponseEntity<>(archivedTasks, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Task> updateTask(@RequestBody Task task) throws TaskNotFoundException {
        Task updatedTask = iTaskService.updateTask(task);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @PutMapping("/archive/{taskId}")
    public ResponseEntity<Task> archiveTask(@PathVariable String taskId) throws TaskNotFoundException {  // Changed from int to String
        Task archivedTask = iTaskService.archiveTask(taskId);
        return new ResponseEntity<>(archivedTask, HttpStatus.OK);
    }
}
